import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { JSX, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const scale: number = width / 390;
const normalize = (size: number): number => Math.round(size * scale);

export default function Login(): JSX.Element {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    "Rajdhani-SemiBold": require("@/assets/fonts/Rajdhani-SemiBold.ttf"),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);

  const validateEmail = (value: string): void => {
    setEmail(value);
    if (value.length === 0) {
      setIsEmailValid(null);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.imageWrapper}>
          <Image
            source={require("@/assets/icons/mh-icon.png")}
            style={styles.illustration}
          />
        </View>
        <Text style={styles.rajdhani}>MedHome</Text>
      </View>

      <Text style={styles.title}>Entrar</Text>
      <Text style={styles.subtitle}>Acesse sua conta com e-mail e senha.</Text>

      <View style={styles.form}>
        <View>
          <View
            style={[
              styles.inputWrapper,
              isEmailValid === true && styles.inputWrapperValid,
              isEmailValid === false && styles.inputWrapperInvalid,
            ]}
          >
            <TextInput
              style={styles.emailInput}
              placeholder="Endereço de E-mail"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={validateEmail}
            />
            {isEmailValid !== null && (
              <Text style={styles.emailIcon}>{isEmailValid ? "✅" : "❌"}</Text>
            )}
          </View>
          {isEmailValid === false && (
            <Text style={styles.emailError}>
              Informe um endereço de e-mail válido.
            </Text>
          )}
        </View>

        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            placeholderTextColor="#aaa"
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            activeOpacity={0.7}
          >
            <Text style={styles.toggleButtonText}>
              {isPasswordVisible ? "👁️" : "🔒"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.registerWrapper}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/frontend/home")}
        >
          <Text style={styles.actionButtonText}>Acessar</Text>
        </TouchableOpacity>
        <View style={styles.registerBottomGroup}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Recuperação de conta</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registerBottomGroup}>
          <Text style={styles.registerQuestion}>Não possui cadastro?</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/frontend/cadastro")}
          >
            <Text style={styles.actionButtonText}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    padding: normalize(32),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: normalize(12),
    marginTop: normalize(16),
    marginBottom: normalize(32),
  },
  imageWrapper: {
    width: normalize(64),
    height: normalize(64),
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: normalize(64),
    height: normalize(64),
    resizeMode: "contain",
  },
  rajdhani: {
    fontFamily: "Rajdhani-SemiBold",
    color: "#83c7f4",
    fontSize: normalize(48),
    lineHeight: normalize(56),
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  title: {
    fontSize: normalize(32),
    fontFamily: "Rajdhani-SemiBold",
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    fontSize: normalize(20),
    fontFamily: "Rajdhani-SemiBold",
    marginTop: normalize(8),
  },
  form: {
    marginTop: normalize(28),
    gap: normalize(32),
  },
  input: {
    width: "100%",
    height: normalize(52),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: normalize(10),
    paddingHorizontal: normalize(16),
    fontSize: normalize(16),
    backgroundColor: "#F5F5F5",
    color: "#333",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: normalize(52),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: normalize(10),
    backgroundColor: "#F5F5F5",
    paddingLeft: normalize(16),
    overflow: "hidden",
  },
  inputWrapperValid: {
    borderColor: "#4caf50",
  },
  inputWrapperInvalid: {
    borderColor: "#f44336",
  },
  emailInput: {
    flex: 1,
    height: "100%",
    fontSize: normalize(16),
    color: "#333",
  },
  emailIcon: {
    paddingHorizontal: normalize(12),
    fontSize: normalize(16),
  },
  emailError: {
    fontFamily: "Rajdhani-SemiBold",
    color: "#f44336",
    fontSize: normalize(13),
    marginTop: normalize(6),
    marginLeft: normalize(4),
  },

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: normalize(52),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: normalize(10),
    backgroundColor: "#F5F5F5",
    paddingLeft: normalize(16),
    overflow: "hidden",
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    fontSize: normalize(16),
    color: "#333",
  },
  toggleButton: {
    height: "100%",
    paddingHorizontal: normalize(14),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#83c7f4",
  },
  toggleButtonText: {
    fontSize: normalize(18),
  },
  registerWrapper: {
    fontFamily: "Rajdhani-SemiBold",
    marginTop: normalize(28),
    alignItems: "center",
    gap: normalize(32),
  },
  registerBottomGroup: {
    width: "100%",
    alignItems: "center",
    gap: normalize(16),
    marginTop: normalize(28),
  },
  registerQuestion: {
    fontFamily: "Rajdhani-SemiBold",
    fontSize: normalize(16),
    color: "#555",
  },
  actionButton: {
    width: "100%",
    backgroundColor: "#83c7f4",
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(32),
    borderRadius: normalize(10),
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "#000",
    fontSize: normalize(16),
    fontWeight: "700",
  },
});
