import gql from 'graphql-tag';

export const getSummonerInfo=(summonerName, region)=>gql`
  query {
    user(userName:"${summonerName}", region:"${region}") {
      summonerLevel
      summonerName
      accountId
      profileIconId
      league {
        tier
        rank
        wins
        losses
        leaguePoints
        queueType
      }
    }
    matches(userName:"${summonerName}", region:"${region}", beginIndex:0, endIndex:3) {
      gameInfos {
        lane
        seasonId
        champion
        gameId
        mapId
        gameDuration
        gameCreation
        gameType
        gameMode
        queueId
        participantIdentities {
          player {
            summonerName
            summonerId
          }
          participantId
        }
        teams {
          teamId
          win
        }
        participants {
          participantId
          teamId
          spell1Id
          spell2Id
          championId
          timeline {
            lane
          }
          stats {
            totalDamageDealtToChampions
            kills
            deaths
            assists
            largestMultiKill
            wardsKilled
            wardsPlaced
            visionWardsBoughtInGame
            item0
            item1
            item2
            item3
            item4
            item5
            item6
            perk0
            perk1
            perk2
            perk3
            perk4
            perk5
            perkPrimaryStyle
            perkSubStyle
            win
            goldEarned
            goldSpent
            champLevel
            totalMinionsKilled
          }
        }
      }
    }
  }
`;

export const getSummonersLeagueInfo=(summonerIds, region)=>gql`
  query {
    users(region:"${region}", summonerIds:[${summonerIds.map(v=>`"${v}"`)}]) {
      league {
        tier
        rank
        queueType
      }
      summonerLevel
      summonerName
      summonerId
    }
  }
`;
