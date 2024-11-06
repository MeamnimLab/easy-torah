import { FlatList, StyleSheet } from "react-native"
import { useSelector } from 'react-redux';

import Game from './Game'

function renderGame(itemData) {
  console.log(itemData.item)
    return <Game {...itemData.item}/>;
  }
  

const AllGames = () => {
    const games = useSelector((state) => state.games.games);
  
    return(
        <FlatList
        data={games}
        renderItem={renderGame}
        keyExtractor={(item) => item.id}
      />
    )
}

const styles = StyleSheet.create({
  screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
})

export default AllGames;