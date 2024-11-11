import { Appbar, useTheme } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

export default function NavigationBar(props) {
  const { navigation, route, options, back } = props
  const title = getHeaderTitle(options, route.name);
  const {colors} = useTheme();
  const backgroundColor = colors.myBeige;
  return (
    <Appbar.Header style={{ backgroundColor }}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content style={{ backgroundColor }} title={title} />
    </Appbar.Header>
  );
}
