import { createClient } from "redis";

const DEFAULT_EXPIRATION = 60*60;

let _client = null;

async function getClient() {
  if (_client === null || _client === undefined) {
    _client = createClient({
      // host: 'https://dss.aegean.gr',//process.env.REDIS_URL,
      // port: 6379,
      // // other configurations if needed
      socket: {
        host: process.env.REDIS_URL
      }
    });
    console.log("connecting to redis:-"+process.env.REDIS_URL+"-")
    await _client.connect();
  }

  return _client;
}

async function setOrUpdateSessionData(sessionId, variableName, variableValue) {
  const client = await getClient();
  const cacheObject = {
    [variableName]: variableValue,
  };

  try {
    const existingObject = JSON.parse(await getSessionData(sessionId));
    if (existingObject) {
      existingObject[variableName] = variableValue;
      await client.set(sessionId, JSON.stringify(existingObject), {
        EX: DEFAULT_EXPIRATION,
      });

      let test = getSessionData(sessionId, variableName);
      console.log(test);
    } else {
      await client.set(sessionId, JSON.stringify(cacheObject), {
        EX: DEFAULT_EXPIRATION,
      });
    }
    return cacheObject
  } catch (error) {
    console.error(error);
    return error
  }
}

async function getSessionData(sessionId, variableName = null) {
  const client = await getClient();

  // return new Promise(async (resolve, reject) => {
  try {
    const sessionData = await client.get(sessionId);
    const valueAsObject = JSON.parse(sessionData);
    return variableName !== null ? valueAsObject[variableName] : sessionData;
  } catch (e) {
    console.log(e);
    return null;
  }
  // });
}

export { getSessionData, setOrUpdateSessionData };
