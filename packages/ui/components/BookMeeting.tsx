import React, { useState } from 'react';

interface MeetingSlot {
  startTime: string;
  endTime: string;
}

interface BookMeetingProps {
  teacherId: number;
  availableSlots: MeetingSlot[];
  unavailableSlots: MeetingSlot[];
  onSubmit: (meetingDetails: MeetingDetails) => void;
}

interface MeetingDetails {
  teacherId: number;
  studentId: number; // Assuming you have the student's ID available
  startTime: string;
  endTime: string;
}

export const BookMeeting: React.FC<BookMeetingProps> = ({
  teacherId,
  availableSlots,
  unavailableSlots,
  onSubmit,
}) => {
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  const handleSelectSlot = (index: number) => {
    setSelectedSlotIndex(index);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedSlotIndex !== null) {
      const selectedSlot = availableSlots[selectedSlotIndex];
      const meetingDetails: MeetingDetails = {
        teacherId: teacherId,
        studentId: 123, // Replace with actual student ID
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      };
      onSubmit(meetingDetails);
    }
  };

  const isSlotUnavailable = (slot: MeetingSlot) => {
    return unavailableSlots.some(
      unavailableSlot =>
        unavailableSlot.startTime === slot.startTime && unavailableSlot.endTime === slot.endTime
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Meeting Slots:</h2>
      <ul>
        {availableSlots.map((slot, index) => (
          <li key={index}>
            <input
              type="radio"
              id={`slot_${index}`}
              name="slot"
              value={index}
              checked={selectedSlotIndex === index}
              onChange={() => handleSelectSlot(index)}
              disabled={isSlotUnavailable(slot)}
            />
            <label htmlFor={`slot_${index}`}>
              {slot.startTime} - {slot.endTime} {isSlotUnavailable(slot) && "(Unavailable)"}
            </label>
          </li>
        ))}
      </ul>
      <button type="submit" disabled={selectedSlotIndex === null}>
        Book Meeting
      </button>
    </form>
  );
};
