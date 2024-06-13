import { Proposal } from "@/services/nouns-builder/governor";
import { Fragment } from "react";

export default function ProposalStatus({ proposal }: { proposal: Proposal }) {
  const { state } = proposal;

  switch (state) {
    case 0:
      return (
        <div className="bg-[--brand-pending] text-[--brand-text-main p-1 px-2 rounded-md w-24 text-center">
          Pending
        </div>
      );
    case 1:
      return (
        <div className="bg-[--brand-active] text-[--brand-text-main p-1 px-2 rounded-md w-24 text-center">
          Active
        </div>
      );
    case 2:
      return (
        <div className="bg-[--brand-canceled] text-[--brand-text-main p-1 px-2 rounded-md w-24 text-center">
          Canceled
        </div>
      );
    case 3:
      return (
        <div className="bg-[--brand-defeated] text-[--brand-text-main p-1 px-2 rounded-md w-24 text-center">
          Defeated
        </div>
      );
    case 4:
      return (
        <div className="bg-[--brand-succeeded] text-[--brand-text-main p-1 px-2 rounded-md w-24 text-center">
          Succeeded
        </div>
      );
    case 5:
      return (
        <div className="bg-[--brand-queued] text-[--brand-text-main p-1 px-2 rounded-md w-24 text-center">
          Queued
        </div>
      );
    case 6:
      return (
        <div className="bg-[--brand-expired] text-[--brand-text-main p-1 px-2 rounded-md w-24 text-center">
          Expired
        </div>
      );
    case 7:
      return (
        <div className="bg-[--brand-executed] text-[--brand-text-main] p-1 px-2 rounded-md w-24 text-center">
          Executed
        </div>
      );
    case 8:
      return (
        <div className="bg-[--brand-vetoed] text-[--brand-text-main p-1 px-2 rounded-md w-24 text-center">
          Vetoed
        </div>
      );
    default:
      return <Fragment />;
  }
}
