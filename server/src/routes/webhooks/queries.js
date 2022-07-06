export const GET_MEETING_PARTICIPANTS = `
  query getParticipants($id: Int!) {
    meetings_by_pk(id: $id) {
      meeting_date
      title
      user {
        email
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

export const GET_MEETING_PARTICIPANTS_REMINDER = `
  query getParticipants($id: Int!) {
    meetings_by_pk(id: $id) {
      meeting_date
      title
      user {
        email
        name
        surname
      }
      participants (
        where: {
          is_approved: {
            _eq: true
          }
        }
      ) {
        user {
          email
          name
          surname
        }
      }
    }
  }
`;
