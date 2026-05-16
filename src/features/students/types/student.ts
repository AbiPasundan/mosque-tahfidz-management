export interface Student {
    id: string;
    mentor_id: string;
    mentor_name?: string;
    name: string;
    password: string;
    profile_img: string;
    cover_img: string;
    age: number;
    learning_level: string;
    last_progress: string;
    fluency: string;
    contact: string;
    status: "Active" | "Pending" | "Inactive" | "Graduated";
    join_date: string;
    created_at: string;
    updated_at: string;
}
// id, mentor_id, name, password, profile_img, cover_img, age, learning_level, fluency, status, join_date, last_progress, created_at, updated_at
export type StudentStatus = Student["status"];
