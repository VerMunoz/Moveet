# NodeJS, MongoDB y Elasticsearch 
Este es un ejemplo para enlazar NodeJs, MongoDB y Elasticsearch

## MongoDB 
1. Instalar MongoDB 
```
docker run --name mongodb -v /etc/app/mongo:/etc/mongo  -p 27017:27017 -d -e MONGO_INITDB_ROOT_USERNAME=<username> -e MONGO_INITDB_ROOT_PASSW
ORD=<password> -e MONGO_INITDB_DATABASE=<name_databese> mongo
```

2. Entrar al contendor 
```
docker exec -it mongodb bash
```

3. Comandos base de datos 
```
mongo -u <username> -p <password>
use <name_database>
show collections

```
## Elasticsearch
1. Crear red 
```
docker network create elastic
```

2. Instalar Elastic 
```
docker run -d --name elasticsearch --net elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.6.1
```

3. Entrar al contendor 
```
docker exec -it elasticsearch bash
```

4. Verificar la instalación 
```
curl localhost:9200
```

5. Instalar Kibana

```
docker run -d --name kibana --net elastic -p 5601:5601 kibana:7.6.1
```


## NodeJS 
Se utiliza las dependencias mongoose, mongoostatic.

1. Iniciar el proyecto. 
```
npm init --y
```

2. Instalar dependencias 
```
npm install --save mongoose mongoosastic
```

3. En el archivo ``index.js`` agregar en la siguiente línea el usuario, password y nombre de la base de datos.
```
mongoose.connect('mongodb://<user>:<password>@<IP>:27017/<nombre_de_base_de_datos>', { useNewUrlParser: true, useUnifiedTopology: true });
```

4. Si el Elasticsearch está en otro host, agregar en el archivo ``index.js`` el host. 
```
UserSchema.plugin(mongoosastic, {
    "host": "localhost",  // Url Elastic
    "port": 9200
});
```

5. Iniciar la app
``` 
node index.js
```


