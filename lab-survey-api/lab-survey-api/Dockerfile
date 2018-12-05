FROM microsoft/dotnet:2.1-sdk-alpine AS build-env
WORKDIR /src
COPY lab-survey-api.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o out

# build runtime image
FROM microsoft/dotnet:2.2-aspnetcore-runtime-alpine
WORKDIR /app
COPY --from=build-env /src/out ./
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000/tcp
ENTRYPOINT ["dotnet", "lab-survey-api.dll"]
