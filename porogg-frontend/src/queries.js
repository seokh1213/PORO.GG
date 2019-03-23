import gql from 'graphql-tag';

export const getSummonerInfo=(summonerName)=>gql`
  query {
    user(userName:"${summonerName}") {
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

