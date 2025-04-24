# 🚀 Tutorial: Instalacion y Análisis de código con SonarQube Cloud desde la terminal ubuntu

Este tutorial te guiará paso a paso para instalar y analizar un proyecto con **SonarQube Cloud** usando la terminal y el escáner SonarScanner.

---

## 📦 Paso 1: Instalar SonarScanner

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

## 📄 Paso 2: Crear el archivo `sonar-project.properties`

Ubícate en la raíz del proyecto y crea el archivo:

```bash
vim sonar-project.properties
```

Ejemplo de contenido adaptado para un proyecto TypeScript (IMPORTANTE: sustituir valores de las variables por los de tu proyecto):

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

Al finalizar, aparecerá el nuevo proyecto en SonarQube Cloud.

---

## ✅ Consejos adicionales

- Usa `sonar.exclusions` para evitar analizar carpetas irrelevantes (HTML, imágenes, documentación...).
- Añadir SonarCloud a GitHub Actions para automatizar el análisis.

---

¡Listo! Has configurado y ejecutado tu primer análisis con SonarCloud. 🎉