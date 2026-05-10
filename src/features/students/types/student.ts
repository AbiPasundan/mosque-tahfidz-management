export interface Student {
    id: string;
    name: string;
    age: number;
    nis: string;
    class: string;
    learning_level: string;
    fluency: string;
    status: "Active" | "Pending" | "Inactive" | "Graduated";
    join_date: string;
}

export type StudentStatus = Student["status"];
