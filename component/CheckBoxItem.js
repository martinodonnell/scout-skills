import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import Checkbox from "expo-checkbox";

export const CheckBoxItem = ({ cb, onChange, disabled }) => {
  const [isChecked, setIsChecked] = useState(cb.checked);

  const onClick = () => {
    if (!disabled) {
      setIsChecked(!isChecked);
      onChange();
    }
  };

  return (
    <TouchableWithoutFeedback key={cb.id} onPress={() => onClick()}>
      <View style={styles.container}>
        <Checkbox
          style={styles.checkBox}
          value={isChecked}
          onValueChange={() => onClick()}
        />
        <Text style={styles.text}>{cb.question}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    borderLeftWidth: 5,
    borderLeftColor: "#FF8846",

    borderWidth: 0.8,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderRightColor: "#C5C7C4",
    borderTopColor: "#C5C7C4",
    borderBottomColor: "#C5C7C4",

    backgroundColor: "white",

    marginHorizontal: 20,
    marginVertical: 3,

    paddingVertical: 10,
    paddingHorizontal: 5,
  },

  checkBox: {
    marginEnd: 10,
    alignSelf: "center",
  },
  text: {
    flex: 4,
    fontSize: 15,
  },
});
