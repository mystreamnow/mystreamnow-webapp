## Player Direct

Esse projeto é responsável pelo Player do Direct.

## Trabalhando no desenvolvimento

Para você trabalhar em modo desenvolvimento existem dois pontos importantes:

## Pacotes npm privados

Para preparar o ambiente é necessário instalar um pacote npm privado que pertence a Atitude na npm.
Por favor peça ao supervisor para colocar seu usuário npm como colaborador na organização atitude.
Isso será necessário ao instalr o pacote `@atitude/wmdirect-player`.

Para instalar esse pacote por favor, instale o npm

```
    npm install
```

Para isso configute o endereço do registro:

```
    npm set registry https://registry.npmjs.org/
```

_Opcional_ - Definir que a conta sempre estará sempre loggada.

```
    npm config set always-auth true
```

Depois realize o login na plataforma. fornecendo seu nome de usuário, após isso, senha e e-mail da conta.

```
    npm login  --scope=@atitude
```

Com tudo configurado com sucesso, agora é possível instalar o pacote privado.

```
    npm i @atitude/wmdirect-player
```

Obs:. O [npm](https://www.npmjs.com/) é utilizado para este pacote, mas para administar os demais é utilizado o [yarn](https://yarnpkg.com/en/).