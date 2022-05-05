/*
This is an example snippet - you should consider tailoring it
to your service.
*/
export async function insertStats(token, { favourited, userId, watched, videoId }) {

  //, on_conflict: {constraint: stats_pkey}
  const operationsDoc = `mutation insertStats($favourited: Int! ,$userId : String!,$watched: Boolean!,$videoId: String!) {
  insert_stats_one(object: {
    favourited: $favourited, 
    userId: $userId, 
    videoId: $videoId, 
    watched: $watched
  }) {
          favourited,
          userId,
          videoId,
          watched
      }
}
`;
  return await queryHasuraGQL(
    operationsDoc,
    "insertStats",
    {
      favourited,
      userId,
      watched,
      videoId
    }, token
  );
}
export async function getvideos(token, userId, videoId) {

  const operationsDoc = ` query MyQuery3($userId : String!) {
  stats(
    where: 
    {userId: {_eq: $userId}}) {
    favourited
    id
    userId    
  }
}
`;
}

// _set: {favourited: 10})
export async function updateStats(token, { favourited, userId, watched, videoId }) {

  const operationsDoc = `mutation updateStats($favourited: Int! ,$userId : String!,$watched: Boolean!,$videoId: String!) {
  update_stats(
    where: {
      userId: {_eq: $userId}, 
      videoId: {_eq: $videoId}}, 
    _set: {watched: $watched, favourited : $favourited}) {
      returning{
    favourited,
    userId,
    watched,
    videoId
  }
  }
}`
  return await queryHasuraGQL(
    operationsDoc,
    "updateStats",
    {
      favourited,
      userId,
      watched,
      videoId
    }, token
  );
}

export async function findVideoIdByUser(token, userId, videoId) {
  const operationsDoc = `  
  query findVideoIdByUserId($userId: String!,$videoId: String!) {
    stats(where: { userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      favourited
      userId
      videoId
      watched
    }
  }
`;
  //const {issuer,email, publicAddress} = metadata
  const response = await queryHasuraGQL(
    operationsDoc,
    "findVideoIdByUserId",
    {
      userId,
      videoId,
    }, token
  );
  //console.log({response?.data?.stats})
  return response?.data?.stats

}

export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
      publicAddress
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    {
      issuer
    }, token
  );
  return response?.data?.users?.length === 0
}

export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email :String!,$publicAddress:String!) {
    insert_users(objects: {email: $email,  issuer: $issuer, publicAddress: $publicAddress}) {
      affected_rows
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const { issuer, email, publicAddress } = metadata
  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    {
      issuer,
      email,
      publicAddress
    }, token
  );
  return response
}

export async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
    {
      method: "POST",
      headers: {
        'Authorization': `Bearer  ${token}`,
        'Content-type': "application/json"
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}







