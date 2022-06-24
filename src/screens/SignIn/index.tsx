import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  async function handleSignInAnonymoualy() {
    const { user } = await auth().signInAnonymously(); 

    console.log(user);
  }

  function handleCreateUserAccount(){
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Usuário criado com sucesso'))
      .catch((error) => {
        if(error.code === 'auth/email-already-in-use'){
          return Alert.alert('E-mail already registered');
        } else if(error.code === 'auth/weak-password') {
          Alert.alert('E-mail already registered');
        } else if(error.code === 'auth/invalid-email') {
          Alert.alert('E-mail not valid');
        }
      }); 
  }

  function handleSignWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => console.log(user))
      .catch((error) => {

        if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          Alert.alert('E-mail or Password incorrect'); 
        }
      })
  }

  function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Enviamos um link para o seu E-mail'));
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}