import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { HeaderProps } from "@type";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Header = ({ title }: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{ padding: 2 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
