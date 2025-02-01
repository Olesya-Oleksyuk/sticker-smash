import { FontAwesome } from "@expo/vector-icons";
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";

export enum ButtonTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

type Props = {
  children?: React.ReactNode;
  label?: string;
  theme?: ButtonTheme;
  style?: StyleProp<ViewStyle>;
  icon?: keyof typeof FontAwesome.glyphMap;
  onPress?: () => void;
  className?: string;
};

export default function Button({
  label,
  theme,
  style,
  icon,
  onPress,
  className,
}: Props) {
  if (theme === ButtonTheme.PRIMARY) {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
          style,
        ]}
        className={className}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={onPress}
          className={className}
        >
          {icon && (
            <FontAwesome
              name={icon}
              size={18}
              color="#25292e"
              style={styles.buttonIcon}
            />
          )}

          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.buttonContainer, style]} className={className}>
      <Pressable style={styles.button} onPress={onPress} className={className}>
        <Text className="text-white text-sm">{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    // flex: 0,
    // width: "auto",
    // width: "100%",
    // minWidth: 220,
    // width: "auto",
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    // width: "100%",
    paddingHorizontal: 20,
    borderRadius: 10,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
