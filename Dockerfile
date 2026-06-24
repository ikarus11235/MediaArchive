ARG DOTNET_VERSION=8.0
ARG PROJECT_PATH=MediaController/MediaController.csproj

FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_VERSION} AS build

ARG PROJECT_PATH

WORKDIR /src

COPY . .

RUN dotnet restore "${PROJECT_PATH}"

RUN dotnet publish "${PROJECT_PATH}" \
    -c Release \
    -o /app/publish \
    --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:${DOTNET_VERSION}

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "MediaController.dll"]