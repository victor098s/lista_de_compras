import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  Modal,
  Alert,
} from "react-native";

export default function App() {
  const [textoProduto, setTextoProduto] = useState("");

  const [listaCompras, setListaCompras] = useState([]);

  const [modalVisivel, setModalVisivel] = useState(false);

  const [produtos, setProdutos] = useState([
    {
      id: "1",
      nome: "Arroz",
      imagem: "https://rotinacozinha.com/cdn/shop/files/arroz.jpg?v=1692131276",
    },
    {
      id: "2",
      nome: "Leite condensado",
      imagem:
        "https://mambodelivery.vtexassets.com/arquivos/ids/208976/7891000100103---Leite-Condensado-Moca-Tradicional-Lata-Abre-Facil-48X395g---1.jpg?v=638512913330670000",
    },
    {
      id: "3",
      nome: "Bolacha recheada Oreo",
      imagem:
        "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Oreo-Two-Cookies.png/1920px-Oreo-Two-Cookies.png?utm_source=pt.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    },
    {
      id: "4",
      nome: "Doritos",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYUgVD7U0ShDwi8LnQa5wwtSbdAwa88baFXz2moT-KOA&s=10",
    },
    {
      id: "5",
      nome: "Bolo de chocolate",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGy5THcOd_CpHQmaLKSm9JXsslDNy7rmestXRAUyAa1g&s=10",
    },
    {
      id: "6",
      nome: "Coca-Cola em lata",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvCZG2qLcjpaIMuMVc1IIoI5gJ6duHv_w8HOO5Pcxpw&s=10",
    },
    {
      id: "7",
      nome: "Pizza de muçarela",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7yeoireixUqGc0Pz4y095iEP2AwFASz06amu6flDYbw&s=10",
    },
    {
      id: "8",
      nome: "Lasanha",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5WkTvbdOevAdJXkkadAvOLH6eutLRK6mdu-YW9hGjDA&s=10",
    },
  ]);

  const adicionarItem = (produtoItem) => {
    setListaCompras((listaAtual) => [
      ...listaAtual,
      { ...produtoItem, id: Date.now().toString() },
    ]);

    setTextoProduto("");
  };

  const removerItemDaListaCompras = (id) => {
    setListaCompras((listaAtual) =>
      listaAtual.filter((item) => item.id !== id),
    );
  };

  const adicionarProdutoDigitado = () => {
    const nomeLimpo = textoProduto.trim();

    if (!nomeLimpo) {
      Alert.alert("Campo Vazio", "Por favor, digite o nome de um produto.");
      return;
    }

    const novoObj = {
      id: Date.now().toString(),
      nome: nomeLimpo,
    };

    setListaCompras((listaAtual) => [...listaAtual, novoObj]);
    setTextoProduto("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>VtMarket</Text>
      </View>

      <View style={styles.verListaContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.botaoVerLista,
            pressed && styles.botaoPressionado,
          ]}
          onPress={() => setModalVisivel(true)}
        >
          <Text style={styles.textoBotaoVerLista}>
            LISTA DE PRODUTOS ({listaCompras.length})
          </Text>
          <Text style={styles.txtInfoList}>Clique aqui para visualizar</Text>
        </Pressable>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite um produto..."
          placeholderTextColor="#94a3b8"
          value={textoProduto}
          onChangeText={setTextoProduto}
          onSubmitEditing={adicionarProdutoDigitado}
          returnKeyType="done"
        />
        <Pressable
          style={({ pressed }) => [
            styles.botaoAdicionar,
            pressed && styles.botaoPressionado,
          ]}
          onPress={adicionarProdutoDigitado}
        >
          <Text style={styles.textoBotaoAdicionar}>ADICIONAR</Text>
        </Pressable>
      </View>

      <Text style={styles.TextEssencialsMarket}>
        Produtos que não devem faltar na lista !
      </Text>

      <ScrollView contentContainerStyle={styles.cards}>
        {produtos.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image
              style={styles.imageCard}
              source={{ uri: item.imagem }}
              resizeMode="cover"
            />

            <View style={styles.infoContainer}>
              <Text style={styles.tituloCard}>{item.nome}</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.botaoAdicionarCard,
                pressed && styles.botaoPressionado,
              ]}
              onPress={() => adicionarItem(item)}
            >
              <Text style={styles.textoBotaoAdicionarCard}>ADICIONAR</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Lista de Compras</Text>

            {listaCompras.length === 0 ? (
              <Text style={styles.modalVazio}>A lista está vazia!</Text>
            ) : (
              <ScrollView style={styles.modalLista}>
                {listaCompras.map((item) => (
                  <View key={item.id} style={styles.modalItem}>
                    <View style={styles.modalItemInfo}>
                      <Text style={styles.modalItemNome}>{item.nome}</Text>
                    </View>
                    <Pressable
                      style={styles.botaoRemoverModalItem}
                      onPress={() => removerItemDaListaCompras(item.id)}
                    >
                      <Text style={styles.textoBotaoRemoverModalItem}>
                        Excluir ❌
                      </Text>
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            )}

            <Pressable
              style={styles.botaoFecharModal}
              onPress={() => setModalVisivel(false)}
            >
              <Text style={styles.textoBotaoFecharModal}>FECHAR</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242b33",
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#1a1c22",
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e9eef9",
  },
  verListaContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: "#1a1c22",
  },
  botaoVerLista: {
    backgroundColor: "#16a34a",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBotaoVerLista: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
    flexDirection: "column",
  },

  txtInfoList: {
    fontSize: 10,
    color: "#ffffff",
    margin: 5,
  },

  inputContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 10,
    backgroundColor: "#1a1c22",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#424345",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#ffffff",
    backgroundColor: "#2e3744",
  },
  botaoAdicionar: {
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  textoBotaoAdicionar: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
  botaoPressionado: {
    opacity: 0.7,
  },
  cards: {
    padding: 16,
    paddingBottom: 30,
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    alignItems: "center",
    backgroundColor: "#1a1c22",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
    width: 150,
    border: "1px solid #abcbff",
  },
  imageCard: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#2e3744",
    marginBottom: 8,
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  tituloCard: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e2e8f0",
    textAlign: "center",
  },
  precoCard: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4ade80",
    marginTop: 4,
  },
  botaoAdicionarCard: {
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 6,
  },
  textoBotaoAdicionarCard: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 13,
  },
  botaoExcluirCard: {
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  textoBotaoExcluirCard: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1a1c22",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: "#334155",
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e9eef9",
    marginBottom: 16,
    textAlign: "center",
  },
  modalVazio: {
    color: "#94a3b8",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 20,
  },
  modalLista: {
    marginBottom: 16,
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  modalItemInfo: {
    flex: 1,
  },
  modalItemNome: {
    color: "#e2e8f0",
    fontSize: 16,
  },
  modalItemPreco: {
    color: "#4ade80",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 2,
  },
  botaoRemoverModalItem: {
    padding: 6,
  },
  textoBotaoRemoverModalItem: {
    fontSize: 16,
    backgroundColor: "#ffa7a7",
    padding: 8,
    borderRadius: 8,
  },
  botaoFecharModal: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBotaoFecharModal: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },

  TextEssencialsMarket: {
    fontSize: 18,
    padding: 5,
    color: "rgb(202, 214, 251)",
  },
});
