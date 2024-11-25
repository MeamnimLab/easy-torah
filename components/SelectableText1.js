import React, { useState, useCallback } from "react";
import { Text, View, ActionSheetIOS, Platform, UIManager, findNodeHandle } from "react-native";
import { v4 as uuidv4 } from "uuid";
import memoize from "fast-memoize";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const combineHighlights = memoize((numbers) => {
  return numbers
    .sort((a, b) => a.start - b.start || a.end - b.end)
    .reduce(function (combined, next) {
      if (!combined.length || combined[combined.length - 1].end < next.start)
        combined.push(next);
      else {
        const prev = combined.pop();
        combined.push({
          start: prev.start,
          end: Math.max(prev.end, next.end),
          id: next.id,
        });
      }
      return combined;
    }, []);
});

const mapHighlightsRanges = (value, highlights) => {
  const combinedHighlights = combineHighlights(highlights);

  if (combinedHighlights.length === 0)
    return [{ isHighlight: false, text: value }];

  const data = [
    { isHighlight: false, text: value.slice(0, combinedHighlights[0].start) },
  ];

  combinedHighlights.forEach(({ start, end }, idx) => {
    data.push({
      isHighlight: true,
      text: value.slice(start, end),
    });

    if (combinedHighlights[idx + 1]) {
      data.push({
        isHighlight: false,
        text: value.slice(end, combinedHighlights[idx + 1].start),
      });
    }
  });

  data.push({
    isHighlight: false,
    text: value.slice(
      combinedHighlights[combinedHighlights.length - 1].end,
      value.length
    ),
  });

  return data.filter((x) => x.text);
};

const SelectableText1 = ({
  onSelection,
  onHighlightPress,
  value,
  children,
  highlights = [],
  highlightColor = "#ffeb3b",
  textComponentProps,
  style,
  menuItems = [],
  selectable = true,
  ...props
}) => {
  const [selectedText, setSelectedText] = useState("");
  const [textRef, setTextRef] = useState(null);
  
  const textValue = value || children;

  const showMenu = useCallback((selection) => {
    const content = textValue.slice(selection.start, selection.end);
    
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...menuItems, 'Cancel'],
          cancelButtonIndex: menuItems.length,
        },
        (buttonIndex) => {
          if (buttonIndex < menuItems.length) {
            onSelection?.({
              content,
              eventType: menuItems[buttonIndex],
              selectionStart: selection.start,
              selectionEnd: selection.end,
            });
          }
        },
      );
    } else if (Platform.OS === 'android' && textRef) {
      UIManager.showPopupMenu(
        findNodeHandle(textRef),
        menuItems,
        () => {},
        (item, buttonIndex) => {
          onSelection?.({
            content,
            eventType: menuItems[buttonIndex],
            selectionStart: selection.start,
            selectionEnd: selection.end,
          });
        },
      );
    }
  }, [menuItems, onSelection, textValue]);

  const handleTextSelection = ({ nativeEvent: { selection } }) => {
    if (selection && selection.start !== selection.end) {
      setSelectedText(textValue.slice(selection.start, selection.end));
      showMenu(selection);
    }
  };

  const handleHighlightPress = (id) => {
    if (onHighlightPress) {
      onHighlightPress(id);
    }
  };

  const textProps = {
    ref: setTextRef,
    selectable: selectable,
    onSelectionChange: handleTextSelection,
    style: [
      {
        textAlign: Platform.OS === 'android' ? 'left' : 'auto',
      },
      style
    ],
    ...textComponentProps,
    ...props,
  };

  // If we have highlights
  if (highlights.length > 0) {
    const mappedContent = mapHighlightsRanges(textValue, highlights).map(
      ({ isHighlight, text }, index) => (
        <Text
          key={uuidv4()}
          {...textProps}
          onPress={() => isHighlight && handleHighlightPress(index)}
          style={[
            textProps.style,
            isHighlight && { backgroundColor: highlightColor },
          ]}
        >
          {text}
        </Text>
      )
    );

    return <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{mappedContent}</View>;
  }

  // If no highlights
  return (
    <Text {...textProps}>
      {textValue}
    </Text>
  );
};

export default SelectableText1;