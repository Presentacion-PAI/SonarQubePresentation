# 🚀 Tutorial: Análisis de código con SonarCloud desde la terminal

Este tutorial te guiará paso a paso para analizar un proyecto con **SonarCloud** usando la terminal y el escáner SonarScanner.

---

## 🧩 Requisitos previos

- Tener una cuenta en GitHub
- Tener un repositorio (puede ser de prueba)
- Tener instalado Java (JDK 17)

---

## 🛠️ Paso 1: Crear cuenta y organización en SonarCloud

1. Entra en [https://sonarcloud.io](https://sonarcloud.io) e inicia sesión con tu cuenta de GitHub.
2. Crea una **organización personal** (usa tu usuario de GitHub).
3. Importa un repositorio para analizar.
4. Copia el `projectKey` y `organization` del proyecto que aparece en la interfaz.
5. Genera un **token de acceso**:
   - Ve a `My Account > Security`
   - Introduce un nombre y haz clic en `Generate`
   - Copia el token (solo se muestra una vez).

---

## 📦 Paso 2: Instalar SonarScanner

### En Linux (Ubuntu/WSL):

```bash
cd ~
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
unzip sonar-scanner-cli-5.0.1.3006-linux.zip
mv sonar-scanner-5.0.1.3006-linux sonar-scanner
echo 'export PATH="$HOME/sonar-scanner/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Verifica la instalación:

```bash
sonar-scanner -v
```

---

## 📄 Paso 3: Crear el archivo `sonar-project.properties`

Ubícate en la raíz del proyecto y crea el archivo:

```bash
nano sonar-project.properties
```

Ejemplo de contenido adaptado para un proyecto TypeScript:

```ini
sonar.projectKey=mi-organizacion_mi-proyecto
sonar.organization=mi-organizacion
sonar.host.url=https://sonarcloud.io
sonar.token=mi_token_generado

sonar.sources=src/
sonar.exclusions=**/docs/**, **/www/img/**, **/*.html, **/*.css, **/*.png
sonar.test.exclusions=**/tests/**, **/*.spec.ts, **/*.test.ts
sonar.language=ts
sonar.sourceEncoding=UTF-8
```

---

## 🚀 Paso 4: Ejecutar el análisis

Desde la raíz del proyecto, ejecuta:

```bash
sonar-scanner
```

Al finalizar, aparecerá una URL con el informe del análisis.

---

## 🔍 Paso 5: Interpretar los resultados

Ve a la URL proporcionada por el escáner. Verás:

- **Quality Gate**: estado general del proyecto.
- **Bugs / Vulnerabilities / Code Smells**: errores, problemas de seguridad y malas prácticas.
- **Coverage / Duplications**: cobertura de tests y código duplicado.

---

## ✅ Consejos adicionales

- Usa `sonar.exclusions` para evitar analizar carpetas irrelevantes (HTML, imágenes, documentación...).
- Puedes añadir SonarCloud a GitHub Actions más adelante para automatizar el análisis.

---

¡Listo! Has configurado y ejecutado tu primer análisis con SonarCloud. 🎉