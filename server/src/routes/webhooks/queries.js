export const GET_MEETING_PARTICIPANTS = `
  query getParticipants($id: Int!) {
    meetings_by_pk(id: $id) {
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
