import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { JSX, useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

const scale: number = width / 390;
const normalize = (size: number): number => Math.round(size * scale);

export default function Register(): JSX.Element {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "Rajdhani-SemiBold": require("@/assets/fonts/Rajdhani-SemiBold.ttf"),
  });

  const [name, setName] = useState<string>("");
  const [isNameValid, setIsNameValid] = useState<boolean | null>(null);

  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);

  const [phone, setPhone] = useState<string>("");
  const [isPhoneValid, setIsPhoneValid] = useState<boolean | null>(null);

  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState<
    boolean | null
  >(null);

  const validateName = (value: string): void => {
    setName(value);
    if (value.length === 0) {
      setIsNameValid(null);
      return;
    }
    setIsNameValid(value.trim().length >= 3);
  };

  const validateEmail = (value: string): void => {
    setEmail(value);
    if (value.length === 0) {
      setIsEmailValid(null);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const validatePhone = (value: string): void => {
    const digits = value.replace(/\D/g, "");
    setPhone(digits);
    if (digits.length === 0) {
      setIsPhoneValid(null);
      return;
    }
    setIsPhoneValid(digits.length >= 10 && digits.length <= 11);
  };

  const validatePassword = (value: string): void => {
    setPassword(value);
    if (value.length === 0) {
      setIsPasswordValid(null);
      return;
    }
    setIsPasswordValid(value.length >= 8);
    if (confirmPassword.length > 0) {
      setIsConfirmPasswordValid(value === confirmPassword);
    }
  };

  const validateConfirmPassword = (value: string): void => {
    setConfirmPassword(value);
    if (value.length === 0) {
      setIsConfirmPasswordValid(null);
      return;
    }
    setIsConfirmPasswordValid(value === password);
  };

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
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

        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.subtitle}>
          Preencha os campos para criar sua conta.
        </Text>

        <View style={styles.form}>
          {/* Nome */}
          <View>
            <View
              style={[
                styles.inputWrapper,
                isNameValid === true && styles.inputWrapperValid,
                isNameValid === false && styles.inputWrapperInvalid,
              ]}
            >
              <TextInput
                style={styles.fieldInput}
                placeholder="Nome completo"
                placeholderTextColor="#aaa"
                autoCapitalize="words"
                value={name}
                onChangeText={validateName}
              />
              {isNameValid !== null && (
                <Text style={styles.fieldIcon}>
                  {isNameValid ? "✅" : "❌"}
                </Text>
              )}
            </View>
            {isNameValid === false && (
              <Text style={styles.fieldError}>
                Informe um nome com ao menos 3 caracteres.
              </Text>
            )}
          </View>

          {/* E-mail */}
          <View>
            <View
              style={[
                styles.inputWrapper,
                isEmailValid === true && styles.inputWrapperValid,
                isEmailValid === false && styles.inputWrapperInvalid,
              ]}
            >
              <TextInput
                style={styles.fieldInput}
                placeholder="Endereço de E-mail"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={validateEmail}
              />
              {isEmailValid !== null && (
                <Text style={styles.fieldIcon}>
                  {isEmailValid ? "✅" : "❌"}
                </Text>
              )}
            </View>
            {isEmailValid === false && (
              <Text style={styles.fieldError}>
                Informe um endereço de e-mail válido.
              </Text>
            )}
          </View>

          {/* Telefone */}
          <View>
            <View
              style={[
                styles.inputWrapper,
                isPhoneValid === true && styles.inputWrapperValid,
                isPhoneValid === false && styles.inputWrapperInvalid,
              ]}
            >
              <TextInput
                style={styles.fieldInput}
                placeholder="Telefone"
                placeholderTextColor="#aaa"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={validatePhone}
                maxLength={11}
              />
              {isPhoneValid !== null && (
                <Text style={styles.fieldIcon}>
                  {isPhoneValid ? "✅" : "❌"}
                </Text>
              )}
            </View>
            {isPhoneValid === false && (
              <Text style={styles.fieldError}>
                Informe um telefone válido com DDD.
              </Text>
            )}
          </View>

          {/* Senha */}
          <View>
            <View
              style={[
                styles.inputWrapper,
                isPasswordValid === true && styles.inputWrapperValid,
                isPasswordValid === false && styles.inputWrapperInvalid,
              ]}
            >
              <TextInput
                style={styles.fieldInput}
                placeholder="Senha"
                placeholderTextColor="#aaa"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={validatePassword}
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
            {isPasswordValid === false && (
              <Text style={styles.fieldError}>
                A senha deve ter ao menos 8 caracteres.
              </Text>
            )}
          </View>

          {/* Confirmar Senha */}
          <View>
            <View
              style={[
                styles.inputWrapper,
                isConfirmPasswordValid === true && styles.inputWrapperValid,
                isConfirmPasswordValid === false && styles.inputWrapperInvalid,
              ]}
            >
              <TextInput
                style={styles.fieldInput}
                placeholder="Confirmar senha"
                placeholderTextColor="#aaa"
                secureTextEntry={!isConfirmPasswordVisible}
                value={confirmPassword}
                onChangeText={validateConfirmPassword}
              />
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setIsConfirmPasswordVisible((prev) => !prev)}
                activeOpacity={0.7}
              >
                <Text style={styles.toggleButtonText}>
                  {isConfirmPasswordVisible ? "👁️" : "🔒"}
                </Text>
              </TouchableOpacity>
            </View>
            {isConfirmPasswordValid === false && (
              <Text style={styles.fieldError}>As senhas não coincidem.</Text>
            )}
          </View>
        </View>

        <View style={styles.registerWrapper}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Cadastrar-se</Text>
          </TouchableOpacity>
          <View style={styles.registerBottomGroup}>
            <Text style={styles.registerQuestion}>Já possui cadastro?</Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.back()}
            >
              <Text style={styles.actionButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  scrollContent: {
    flexGrow: 1,
  },
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
    gap: normalize(16),
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
  fieldInput: {
    flex: 1,
    height: "100%",
    fontSize: normalize(16),
    color: "#333",
  },
  fieldIcon: {
    paddingHorizontal: normalize(12),
    fontSize: normalize(16),
  },
  fieldError: {
    fontFamily: "Rajdhani-SemiBold",
    color: "#f44336",
    fontSize: normalize(13),
    marginTop: normalize(6),
    marginLeft: normalize(4),
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
