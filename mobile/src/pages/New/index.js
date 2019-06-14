import React, { Component } from "react";

import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";

import styles from "./styles";
import ImagePicker from "react-native-image-picker";
import api from "../../services/api";

export default class New extends Component {
  static navigationOptions = {
    headerTitle: "Nova publicação"
  };
  state = {
    preview: null,
    image: null,
    author: "",
    description: "",
    place: "",
    hashtags: ""
  };

  handleSubmit = async () => {
    const { image, author, place, description, hashtags } = this.state;

    const data = new FormData();
    data.append("image", image);
    data.append("author", author);
    data.append("place", place);
    data.append("description", description);
    data.append("hashtags", hashtags);

    await api.post("posts", data);
    this.props.navigation.navigate("Feed");
  };

  handleSelectImage = () => {
    ImagePicker.showImagePicker(
      {
        title: "Selecionar Imagem"
      },
      upload => {
        if (upload.error) {
          alert("Erro ao obter imagem");
        } else {
          const preview = {
            uri: `data:image/jpeg;base64,${upload.data}`
          };
          let prefix, ext;
          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split(".");
            ext = ext.toLocaleLowerCase() === "heic" ? "jpg" : ext;
          } else {
            prefix = new Date().getTime();
            ext = "jpg";
          }
          const image = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`
          };
          this.setState({ image, preview });
        }
      }
    );
  };
  render() {
    const { author, description, place, hashtags, preview } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => this.handleSelectImage()}
        >
          <Text style={styles.selectButtonText}>Selecionar imagem </Text>
        </TouchableOpacity>

        {preview && <Image style={styles.preview} source={preview} />}

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Autor"
          placeholderTextColor="#999"
          value={author}
          onChangeText={author => this.setState({ author })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Descrição"
          placeholderTextColor="#999"
          value={description}
          onChangeText={description => this.setState({ description })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Lugar"
          placeholderTextColor="#999"
          value={place}
          onChangeText={place => this.setState({ place })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Hashtags"
          placeholderTextColor="#999"
          value={hashtags}
          onChangeText={hashtags => this.setState({ hashtags })}
        />

        <TouchableOpacity
          style={styles.shareButton}
          onPress={this.handleSubmit}
        >
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
