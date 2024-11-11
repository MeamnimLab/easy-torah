import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

export default function NavigationBar(props) {
  const { navigation, route, options, back } = props
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
