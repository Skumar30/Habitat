import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native"

const dimensions = Dimensions.get("window")
const imageWidth = dimensions.width

interface Props {
  text: string
  onPress?: any
}

interface State {
  color: string
  colorToggle: boolean
}

export default class CustomButton extends React.Component<Props, State> {
  _onPress() {
    this.setState({
      color: this.state.colorToggle ? "orange" : "black",
      colorToggle: !this.state.colorToggle,
    })
    if (this.props.onPress) this.props.onPress()
    setTimeout(
      () =>
        this.setState({
          color: this.state.colorToggle ? "orange" : "black",
          colorToggle: !this.state.colorToggle,
        }),
      1000
    ) //used to change color back to black after 1s
  }

  constructor(props: Props) {
    super(props)
    this.state = { color: "black", colorToggle: true }
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress.bind(this)}>
        <View style={{ ...styles.button, backgroundColor: this.state.color }}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#000",
    marginTop: 5,
    width: 0.47 * imageWidth,
    height: 40,
    zIndex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
})
