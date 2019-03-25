import gql from 'graphql-tag';

export const getSummonerInfo=(summonerName, region)=>gql`
  query {
    user(userName:"${summonerName}", region:"${region}") {
    summonerLevel
    summonerName
    summonerId
    profileIconId
    league {
      tier
      rank
      wins
      losses
      leagueName
      leaguePoints
      queueType
    }
  }
}
`;

