# Etapa 1: Build
FROM maven:3.9.2-eclipse-temurin-17 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo pom.xml e as dependências
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# Copia o restante do código da aplicação
COPY src ./src

# Compila o projeto e gera o arquivo JAR
RUN mvn clean package -DskipTests

# Etapa 2: Produção
FROM eclipse-temurin:17-jre-alpine AS production

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo JAR gerado na etapa de build
COPY --from=build /app/target/*.jar app.jar

# Define o profile ativo como 'dev'
#ENV SPRING_PROFILES_ACTIVE=dev

# Expõe a porta padrão do Spring Boot
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["java", "-jar", "app.jar"]