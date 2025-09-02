# Cronómetros — React Native + Expo

Aplicación móvil multiplataforma (Android / iOS) que permite:

- Crear de 1 a 10 cronómetros.  
- Asignar nombre y color a cada cronómetro.  
- Iniciar todos los cronómetros con un botón global.  
- Detener cada cronómetro individualmente, registrando el tiempo.  
- Resetear todos los cronómetros a cero con un botón global.  

---

## 🚀 Tecnologías utilizadas

- **React** + **React Native** — Desarrollo de UI móvil.  
- **Expo** (CLI local con `npx expo`) — Gestión del proyecto y bundling.  
- **EAS (Expo Application Services)** — Builds remotos y cliente de desarrollo.  
- **expo-dev-client** — Cliente nativo para pruebas con módulos nativos.  
- **Expo Router** (estructura `app/`).  
- **TypeScript** (`.ts` / `.tsx`) — Lenguaje recomendado.  
- **Node.js**, **npm**/**yarn**/**corepack**.  
- **Android SDK** (para pruebas en Android).  
- **Apple ID + cuenta Expo** (para pruebas en iOS).  

---

## 🖥️ Requisitos en Arch Linux

```bash
# 1. Sistema actualizado
sudo pacman -Syu

# 2. Dependencias principales
sudo pacman -S nodejs npm git yarn jdk-openjdk android-tools android-udev

# 3. Instalar EAS CLI
npm install --location=global eas-cli
```

---

## 🚩 Primeros pasos

👉 Además necesitas una cuenta en Expo:  
https://expo.dev

### 1. Generar proyecto

```bash
npx create-expo-app cronometros
cd cronometros
```

### 2. Iniciar servidor de desarrollo

```bash
npx expo start
```

Luego, escanea el QR con la app Expo Go (Android) o instala un Dev Client (iOS).

---

## 📂 Estructura del proyecto

```
cronometros/
│── app/                  # Navegación principal (Expo Router)
│   ├── (tabs)/           # Páginas por defecto
│   │   ├── index.tsx     # Pantalla inicial
│   │   └── explore.tsx   # Ejemplo adicional
│   └── _layout.tsx       # Layout general
│
│── assets/               # Recursos estáticos (imágenes, íconos, fuentes)
│── components/           # Componentes reutilizables
│── constants/            # Constantes globales
│── hooks/                # Hooks personalizados
│── src/                  # (opcional) lógica de negocio
│── package.json          # Configuración del proyecto
│── tsconfig.json         # Configuración de TypeScript
│── app.json              # Configuración Expo
│── eas.json              # Configuración de builds EAS
```

---

## 📝 Archivos principales a editar

- `app/(tabs)/index.tsx` → pantalla inicial (añadir lógica de cronómetros).
- `components/` → dividir UI en módulos reutilizables.

---

## 🛠️ Comandos útiles

```bash
# Instalar dependencias
npm install

# Iniciar servidor local
npx expo start

# Compilar en producción (Android/iOS)
eas build

# Login en Expo
eas login
```

---

## 📖 Lenguaje

Proyecto escrito en TypeScript.

- `.tsx` → pantallas y componentes con JSX.
- `.ts` → lógica sin JSX.

Similar a React web, pero usando componentes de React Native como:

```typescript
import { View, Text, Button } from "react-native";
```

---

## ✅ Notas

- Usar siempre `npx expo` (no expo-cli, ya obsoleto).
- EAS requiere cuenta Expo gratuita.
- Para iOS necesitas Apple ID vinculado a Expo.
- Recomendado: lógica en `src/` y UI en `app/`.

---

## Capturas de pantalla en iOS

![IMG_4653](https://github.com/user-attachments/assets/be496aa4-98c8-47a6-97d7-cdf5d76db048)

![IMG_4654](https://github.com/user-attachments/assets/cf97918a-aa94-4bfd-8d20-69fc87b279d1)

![IMG_4655](https://github.com/user-attachments/assets/bcaafc16-a5cd-4635-9d39-7d88d2e63543)

![IMG_4656](https://github.com/user-attachments/assets/2b6eaf15-e015-45a6-a297-6ab81dcb823b)


## Capturas de pantalla en Android

![1000001591](https://github.com/user-attachments/assets/ba0fb5a0-f0b9-4262-af5e-8c7cf8e51fa0)

![1000001597](https://github.com/user-attachments/assets/63262fad-53d3-45fc-9844-ed3458603ef9)

![1000001592](https://github.com/user-attachments/assets/22c48641-f663-4688-a70a-333d51476bb5)

![1000001595](https://github.com/user-attachments/assets/ead3baf8-00ac-44e3-adb0-dcd3ff75e54a)
