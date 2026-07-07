import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { JSX, useState } from "react";
import {
    Dimensions,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

const scale: number = width / 390;
const normalize = (size: number): number => Math.round(size * scale);

const USERNAME = "Usuário";

const GRID_ITEMS = [
  { id: 1, label: "Horários de\nMedicações" },
  { id: 2, label: "Indicador\nde Saúde" },
  { id: 3, label: "Glicemia" },
  { id: 4, label: "Pressão\nArterial" },
  { id: 5, label: "Ciclo\nMenstrual" },
  { id: 6, label: "WIP" },
];

export default function Home(): JSX.Element {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "Rajdhani-SemiBold": require("@/assets/fonts/Rajdhani-SemiBold.ttf"),
  });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.userIconWrapper}
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.userIcon}>👤</Text>
        </TouchableOpacity>

        <View style={styles.logoGroup}>
          <Image
            source={require("@/assets/icons/mh-icon.png")}
            style={styles.illustration}
          />
          <Text style={styles.rajdhani}>MedHome</Text>
        </View>
      </View>

      {/* Saudação */}
      <Text style={styles.greeting}>
        Olá, <Text style={styles.greetingName}>{USERNAME}</Text>!
      </Text>

      {/* Grid */}
      <View style={styles.grid}>
        {GRID_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.gridItem}
            activeOpacity={0.8}
          >
            <Text style={styles.gridItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal de perfil */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsModalVisible(false)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalUserIcon}>👤</Text>
              <Text style={styles.modalTitle}>Perfil 1</Text>
            </View>
            <View style={styles.modalDivider} />
            <Text style={styles.modalUsername}>{USERNAME}</Text>
            <Text style={styles.modalInfo}>Conta principal</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsModalVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalExitButton}
              onPress={() => {
                setIsModalVisible(false);
                router.replace("/frontend/login");
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.modalExitButtonText}>Sair</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
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
    marginTop: normalize(16),
    marginBottom: normalize(32),
    gap: normalize(12),
  },
  userIconWrapper: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  userIcon: {
    fontSize: normalize(22),
  },
  logoGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: normalize(12),
    flex: 1,
    justifyContent: "flex-start",
  },
  illustration: {
    width: normalize(52),
    height: normalize(52),
    resizeMode: "contain",
  },
  rajdhani: {
    fontFamily: "Rajdhani-SemiBold",
    color: "#83c7f4",
    fontSize: normalize(40),
    lineHeight: normalize(48),
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  greeting: {
    fontFamily: "Rajdhani-SemiBold",
    fontSize: normalize(24),
    color: "#333",
    marginBottom: normalize(28),
  },
  greetingName: {
    fontFamily: "Rajdhani-SemiBold",
    fontSize: normalize(24),
    color: "#83c7f4",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: normalize(16),
  },
  gridItem: {
    width: (width - normalize(96)) / 2,
    aspectRatio: 1,
    backgroundColor: "#83c7f4",
    borderRadius: normalize(16),
    justifyContent: "center",
    alignItems: "center",
    padding: normalize(12),
  },
  gridItemText: {
    fontFamily: "Rajdhani-SemiBold",
    fontSize: normalize(16),
    color: "#000",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "80%",
    backgroundColor: "#FDFDFD",
    borderRadius: normalize(16),
    padding: normalize(28),
    alignItems: "center",
    gap: normalize(12),
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: normalize(10),
  },
  modalUserIcon: {
    fontSize: normalize(32),
  },
  modalTitle: {
    fontFamily: "Rajdhani-SemiBold",
    fontSize: normalize(26),
    color: "#333",
    fontWeight: "900",
  },
  modalDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: normalize(4),
  },
  modalUsername: {
    fontFamily: "Rajdhani-SemiBold",
    fontSize: normalize(18),
    color: "#83c7f4",
    fontWeight: "700",
  },
  modalInfo: {
    fontFamily: "Rajdhani-SemiBold",
    fontSize: normalize(14),
    color: "#aaa",
  },
  modalCloseButton: {
    marginTop: normalize(8),
    width: "100%",
    backgroundColor: "#83c7f4",
    paddingVertical: normalize(12),
    borderRadius: normalize(10),
    alignItems: "center",
  },
  modalCloseButtonText: {
    fontFamily: "Rajdhani-SemiBold",
    color: "#000",
    fontSize: normalize(16),
    fontWeight: "700",
  },
  modalExitButton: {
    width: "100%",
    backgroundColor: "#e53935",
    paddingVertical: normalize(12),
    borderRadius: normalize(10),
    alignItems: "center",
  },
  modalExitButtonText: {
    fontFamily: "Rajdhani-SemiBold",
    color: "#fff",
    fontSize: normalize(16),
    fontWeight: "700",
  },
});
