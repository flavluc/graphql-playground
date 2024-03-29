import React from "react";
import { Mutation } from "react-apollo";

import { VOTE_MUTATION } from "../resolvers";
import { timeDifferenceForDate } from "../utils";
import { AUTH_TOKEN } from "../constants";

function Link({ link, index, updateStoreAfterVote }) {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <Mutation
            mutation={VOTE_MUTATION}
            variables={{ linkId: link.id }}
            update={updateStoreAfterVote}
          >
            {voteMutation => (
              <div
                style={{ cursor: "pointer" }}
                className="ml1 gray f11"
                onClick={voteMutation}
              >
                ▲
              </div>
            )}
          </Mutation>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes | by{" "}
          {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
          {timeDifferenceForDate(link.createdAt)}
        </div>
      </div>
    </div>
  );
}

export default Link;
