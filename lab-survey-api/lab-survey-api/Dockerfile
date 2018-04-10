FROM microsoft/aspnetcore-build:2.0.6-2.1.101 AS build-env
WORKDIR /src
COPY lab-survey-api.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o out

# build runtime image
FROM microsoft/aspnetcore:2.0.6
WORKDIR /app
COPY --from=build-env /src/out ./
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000/tcp
ENTRYPOINT ["dotnet", "lab-survey-api.dll"]