"use client";

import React, { useState } from "react";
import { Button, Card, Input } from "@nextui-org/react";
import { PlusCircle, MinusCircle, UserPlus } from "lucide-react";

interface Candidate {
  name: string;
  votes: number;
}

export default function Home() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [newName, setNewName] = useState("");

  const addCandidate = () => {
    if (newName.trim()) {
      setCandidates([...candidates, { name: newName.trim(), votes: 0 }]);
      setNewName("");
    }
  };

  const addVote = (index: number) => {
    const newCandidates = [...candidates];
    newCandidates[index].votes += 1;
    setCandidates(newCandidates);
  };

  const removeVote = (index: number) => {
    const newCandidates = [...candidates];
    if (newCandidates[index].votes > 0) {
      newCandidates[index].votes -= 1;
      setCandidates(newCandidates);
    }
  };

  // Calculate total votes across all candidates
  const getTotalVotes = () => {
    return candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
  };

  // Calculate percentage for a specific candidate
  const getVotePercentage = (votes: number) => {
    const totalVotes = getTotalVotes();
    if (totalVotes === 0) return 0;
    return (votes / totalVotes) * 100;
  };

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 bg-gray-800">
          <h1 className="text-2xl font-bold text-white mb-6">
            Live Vote Counter
          </h1>

          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Enter candidate name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-grow"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addCandidate();
                }
              }}
            />
            <Button
              color="primary"
              onClick={addCandidate}
              startContent={<UserPlus size={20} />}
            >
              Add Candidate
            </Button>
          </div>

          <div className="mb-4">
            <p className="text-white">Total Votes: {getTotalVotes()}</p>
          </div>

          <div className="space-y-4">
            {candidates.map((candidate, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">
                    {candidate.name}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => addVote(index)}
                      startContent={<PlusCircle size={16} />}
                    >
                      Add Vote
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => removeVote(index)}
                      startContent={<MinusCircle size={16} />}
                    >
                      Remove Vote
                    </Button>
                  </div>
                </div>

                <div className="relative h-8 bg-gray-600 rounded overflow-hidden">
                  <div
                    className="absolute h-full bg-primary transition-all duration-300"
                    style={{
                      width: `${getVotePercentage(candidate.votes)}%`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    {/* <span className="text-white font-medium z-10">
                      {getVotePercentage(candidate.votes).toFixed(1)}%
                    </span> */}
                    <span className="text-white font-medium z-10">
                      {candidate.votes} votes
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
