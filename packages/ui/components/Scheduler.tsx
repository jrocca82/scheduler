import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ScheduleSlot {
	startTime: string;
	endTime: string;
}

interface ScheduleState {
	[key: string]: ScheduleSlot[];
}

interface CustomSchedulerProps {
	onSubmit: (
		schedule: ScheduleState,
		isDefault: boolean,
		overrideDate?: Date | null
	) => void;
}

export const CustomScheduler: React.FC<CustomSchedulerProps> = ({
	onSubmit,
}) => {
	const [schedule, setSchedule] = useState<ScheduleState>({
		monday: [],
		tuesday: [],
		wednesday: [],
		thursday: [],
		friday: [],
		saturday: [],
		sunday: [],
	});
	const [isDefault, setIsDefault] = useState<boolean>(true);
	const [overrideDate, setOverrideDate] = useState<Date | null>(null);

	const handleAddSlot = (day: string) => {
		setSchedule((prevSchedule) => ({
			...prevSchedule,
			[day]: [...prevSchedule[day], { startTime: "", endTime: "" }],
		}));
	};

	const handleRemoveSlot = (day: string, index: number) => {
		setSchedule((prevSchedule) => ({
			...prevSchedule,
			[day]: prevSchedule[day].filter((_, i) => i !== index),
		}));
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		day: string,
		index: number
	) => {
		const { name, value } = event.target;
		const [time] = name.split("_");
		setSchedule((prevSchedule) => ({
			...prevSchedule,
			[day]: prevSchedule[day].map((slot, i) =>
				i === index ? { ...slot, [time]: value } : slot
			),
		}));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(schedule, isDefault, overrideDate);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="defaultCheckbox">Default Schedule:</label>
				<input
					type="checkbox"
					id="defaultCheckbox"
					checked={isDefault}
					onChange={(e) => setIsDefault(e.target.checked)}
				/>
			</div>
			{!isDefault && (
				<div>
					<label htmlFor="overrideDate">Override Date:</label>
					<DatePicker
						id="overrideDate"
						selected={overrideDate}
						onChange={(date) => setOverrideDate(date)}
						dateFormat="yyyy-MM-dd"
					/>
				</div>
			)}
			{Object.keys(schedule).map((day) => (
				<div key={day}>
					<label>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
					{schedule[day].map((slot, index) => (
						<div key={index}>
							<input
								type="time"
								name={`${day}_${index}_startTime`}
								value={slot.startTime}
								onChange={(event) => handleChange(event, day, index)}
							/>
							<input
								type="time"
								name={`${day}_${index}_endTime`}
								value={slot.endTime}
								onChange={(event) => handleChange(event, day, index)}
							/>
							<button
								type="button"
								onClick={() => handleRemoveSlot(day, index)}
							>
								Remove Slot
							</button>
						</div>
					))}
					<button type="button" onClick={() => handleAddSlot(day)}>
						Add Slot
					</button>
				</div>
			))}
			<div>
				<button type="submit">Save Schedule</button>
			</div>
		</form>
	);
};
