import React, { useState, useEffect } from "react";
import { startInterview, handleAnswer } from "../api/interviewService";
import { roles } from "../data";
import { useToast } from "../Components/ui/use-toast";
import { Button } from "../Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../Components/ui/input";
import  Combobox  from "../Components/Dropdown";
import { interviewTypes } from "../data";

const Interview = () => {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [speechActive, setSpeechActive] = useState(false); // State for tracking speech
  const [name, setName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const savePreferences = () => {
    toast({ description: "Preferences saved!" });
    setIsDialogOpen(false);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const startInterviewSession = async () => {
    if (!selectedRole || !name) {
      toast({
        variant: "destructive",
        title: "Please set your preference",
      });
      return;
    }
    setLoading(true);
    setSpeechActive(true);
    try {
      const initialQuestion = await startInterview(selectedRole, name, interviewType);
      setQuestion(initialQuestion);
      setInterviewStarted(true);
    } catch (error) {
      toast({
        description: "Failed to start the interview. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer) {
      toast({
        description: "Please enter an answer.",
      });
      return;
    }
    setLoading(true);
    try {
      const nextQuestion = await handleAnswer(answer);
      setAnswer("");
      setQuestion(nextQuestion);
      setSpeechActive(true); // Activate speech for the next question
    } catch (error) {
      toast({
        description: "Failed to submit the answer. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle speech synthesis using Web Speech API
  useEffect(() => {
    if (speechActive && question) {
      const utterance = new SpeechSynthesisUtterance(question);
      speechSynthesis.speak(utterance);
      utterance.onend = () => {
        setSpeechActive(false); // Stop speech active state when finished
      };
    }
  }, [speechActive, question]);

  const stopSpeech = () => {
    setSpeechActive(false);
    speechSynthesis.cancel();
  };

  return (
    <div className="h-screen flex flex-col items-center gap-6 justify-center">
      {!interviewStarted && (
        <>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-black w-40 h-12 mt-24"
                onClick={() => setIsDialogOpen(true)}
              >
                Set Preference
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] text-black">
              <DialogHeader>
                <DialogTitle>Set Preferences</DialogTitle>
                <DialogDescription>
                  Give your information to get the best interview experience.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-4 px-6 text-black">
                <div className="flex gap-4 w-full items-center">
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="col-span-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <Combobox
                  items={roles}
                  value={selectedRole}
                  onValueChange={setSelectedRole}
                />
                <Combobox
                  items={interviewTypes}
                  value={interviewType}
                  onValueChange={setInterviewType}
                />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  onClick={savePreferences}
                  className="text-blue-500 bg-white hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-4 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                >
                  Save Preferences
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <button
            onClick={startInterviewSession}
            disabled={loading}
            className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800 h-max"
          >
            {loading ? "Starting...." : "Start"}
          </button>
        </>
      )}

      {interviewStarted && (
        <>
          <div className="boxContainer m-32">
            <div className="box box1"></div>
            <div className="box box2"></div>
            <div className="box box3"></div>
            <div className="box box4"></div>
            <div className="box box5"></div>
          </div>

          <div className="w-full max-w-md mx-auto p-4 space-y-4">
            <div className="text-xl font-bold">{question}</div>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              rows="4"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <Button
              onClick={submitAnswer}
              disabled={loading}
              className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-4 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              {loading ? "Submitting..." : "Submit Answer"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Interview;
