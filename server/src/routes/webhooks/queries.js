export const GET_MEETING_PARTICIPANTS = `
  query getParticipants($id: Int!) {
    meetings_by_pk(id: $id) {
      meeting_date
      title
      user {
        name
        surname
      }
      participants {
        user {
          email
        }
      }
    }
  }
`;
