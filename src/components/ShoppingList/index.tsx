import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore'; 

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

import { shoppingListExample } from '../../utils/shopping.list.data';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    // Estratégia para realizar busca única sem saber se o documento mudou ou não.

    // firestore()
    // .collection('products')
    // .get()
    // .then((response) => {
    //   const data = response.docs.map(( document ) => {
    //     return {
    //       id: document.id,
    //       ...document.data()
    //     }
    //   }) as ProductProps[]; 

    //   setProducts(data); 
    // }).catch(error => console.log(error)); 
    const subscribe = firestore()
    .collection('products')
    .onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(( doc ) => {
        return {
          id: doc.id, 
          ...doc.data(),
        }
      }) as ProductProps[];

      setProducts(data); 

    }); 

    return () => subscribe(); 
  }, []); 

  // useEffect(() => {
  //   firestore()
  //   .collection('products')
  //   .doc('fIzoj0G6fozDKrNfPlFu')
  //   .get()
  //   .then(response => console.log({
  //     id: response.id, 
  //     ...response.data()
  //   }));
  // }, []); 


  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
