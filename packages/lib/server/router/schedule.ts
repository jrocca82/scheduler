import { publicProcedure, router } from "../trpc";

export const scheduleRouter = router({
    saveSchedule: publicProcedure
        .input(input => ({
            teacherId: input.number(),
            isDefault: input.boolean(),
            overrideDate: input.optional.string(),
            schedule: input.object({
                monday: input.object({
                    startTime: input.string(),
                    endTime: input.string(),
                }),
                // Define similar objects for other days of the week
            }),
        }))
        .mutation(async ({ input }) => {
            const { teacherId, isDefault, overrideDate, schedule } = input;

            try {
                if (isDefault) {
                    // Update the default schedule entry in the database
                    const updatedDefaultSchedule = await prisma.teacherSchedule.updateMany({
                        where: { teacherId, is_default: true },
                        data: {
                            from_unix_timestamp_millis: schedule.monday.startTime,
                            to_unix_timestamp_millis: schedule.monday.endTime,
                            // Repeat the above for other days of the week
                        },
                    });

                    return updatedDefaultSchedule;
                } else {
                    // Create an override schedule entry in the database
                    const savedOverrideSchedule = await prisma.teacherSchedule.create({
                        data: {
                            teacher: { connect: { id: teacherId } },
                            is_default: false,
                            from_unix_timestamp_millis: schedule.monday.startTime,
                            to_unix_timestamp_millis: schedule.monday.endTime,
                            // Repeat the above for other days of the week
                            date: new Date(overrideDate),
                        },
                    });

                    return savedOverrideSchedule;
                }
            } catch (error) {
                // Handle errors
                console.error('Error saving schedule:', error);
                throw new Error('Error saving schedule');
            }
        }),
    saveOverrideSchedule: publicProcedure
        .input(input => ({
            teacherId: input.number(),
            overrideDate: input.string(),
            overrideSchedule: input.object({
                startTime: input.string(),
                endTime: input.string(),
            }),
        }))
        .mutation(async ({ input }) => {
            const { teacherId, overrideDate, overrideSchedule } = input;

            try {
                // Create the override schedule entry in the database
                const savedOverrideSchedule = await prisma.teacherSchedule.create({
                    data: {
                        teacher: { connect: { id: teacherId } },
                        is_default: false,
                        from_unix_timestamp_millis: overrideSchedule.startTime,
                        to_unix_timestamp_millis: overrideSchedule.endTime,
                        // Assuming overrideDate is in the format 'YYYY-MM-DD'
                        date: new Date(overrideDate),
                    },
                });

                return savedOverrideSchedule;
            } catch (error) {
                // Handle errors
                console.error('Error saving override schedule:', error);
                throw new Error('Error saving override schedule');
            }
        }),

    updateOverrideSchedule: publicProcedure
        .input(input => ({
            teacherId: input.number(),
            overrideId: input.string(),
            overrideSchedule: input.object({
                startTime: input.string(),
                endTime: input.string(),
            }),
        }))
        .mutation(async ({ input }) => {
            const { teacherId, overrideId, overrideSchedule } = input;

            try {
                // Update the override schedule entry in the database
                const updatedOverrideSchedule = await prisma.teacherSchedule.update({
                    where: { id: overrideId },
                    data: {
                        from_unix_timestamp_millis: overrideSchedule.startTime,
                        to_unix_timestamp_millis: overrideSchedule.endTime,
                    },
                });

                return updatedOverrideSchedule;
            } catch (error) {
                // Handle errors
                console.error('Error updating override schedule:', error);
                throw new Error('Error updating override schedule');
            }
        }),

    deleteOverrideSchedule: publicProcedure
        .input(input => ({
            overrideId: input.string(),
        }))
        .mutation(async ({ input }) => {
            const { overrideId } = input;

            try {
                // Delete the override schedule entry from the database
                await prisma.teacherSchedule.delete({ where: { id: overrideId } });

                return 'Override schedule deleted successfully';
            } catch (error) {
                // Handle errors
                console.error('Error deleting override schedule:', error);
                throw new Error('Error deleting override schedule');
            }
        }),
    getTeacherSchedules: publicProcedure
        .input(input => ({
            teacherId: input.number(),
            month: input.string(),
        }))
        .query(async ({ input }) => {
            const { teacherId, month } = input;

            try {
                // Fetch default schedules and overrides within the specified month
                const schedules = await prisma.teacherSchedule.findMany({
                    where: {
                        teacherId: teacherId,
                        OR: [
                            {
                                is_default: true,
                                from_unix_timestamp_millis: {
                                    gte: new Date(`${month}-01`).getTime(),
                                },
                                to_unix_timestamp_millis: {
                                    lt: new Date(`${month}-01`).setMonth(new Date(`${month}-01`).getMonth() + 1),
                                },
                            },
                            {
                                is_default: false,
                                date: {
                                    gte: new Date(`${month}-01`),
                                    lt: new Date(`${month}-01`).setMonth(new Date(`${month}-01`).getMonth() + 1),
                                },
                            },
                        ],
                    },
                    orderBy: {
                        date: 'asc',
                        from_unix_timestamp_millis: 'asc',
                    },
                });

                // Fetch booked meetings within the specified month
                const bookedMeetings = await prisma.classMeeting.findMany({
                    where: {
                        teacherId: teacherId,
                        from_unix_timestamp_millis: {
                            gte: new Date(`${month}-01`).getTime(),
                        },
                        to_unit_timestamp_millis: {
                            lt: new Date(`${month}-01`).setMonth(new Date(`${month}-01`).getMonth() + 1),
                        },
                    },
                });

                return { schedules, bookedMeetings };
            } catch (error) {
                // Handle errors
                console.error('Error fetching teacher schedules:', error);
                throw new Error('Error fetching teacher schedules');
            }
        }),
    createMeeting: publicProcedure
        .input(input => ({
            teacherId: input.number(),
            studentId: input.number(),
            startTime: input.string(),
            endTime: input.string(),
        }))
        .mutation(async ({ input }) => {
            const { teacherId, studentId, startTime, endTime } = input;

            try {
                // Create the meeting object in the database
                const createdMeeting = await prisma.classMeeting.create({
                    data: {
                        teacherId: teacherId,
                        studentId: studentId,
                        from_unix_timestamp_millis: new Date(startTime).getTime(),
                        to_unit_timestamp_millis: new Date(endTime).getTime(),
                    },
                });

                return createdMeeting;
            } catch (error) {
                // Handle errors
                console.error('Error creating meeting:', error);
                throw new Error('Error creating meeting');
            }
        }),
});