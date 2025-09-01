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

