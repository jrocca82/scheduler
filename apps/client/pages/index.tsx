import { VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { CustomScheduler } from "@scheduler/ui/components/Scheduler";
import {BookMeeting} from "@scheduler/ui/components/BookMeeting"

const HomePage: NextPage = () => {
  return (
    <VStack>
      <CustomScheduler onSubmit={() => {}} />
      <BookMeeting availableSlots={[]} onSubmit={() => { } } teacherId={0} unavailableSlots={[]} />
    </VStack>
  );
};

export default HomePage;
