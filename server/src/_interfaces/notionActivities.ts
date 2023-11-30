export interface Activities {
    "id": number
    "name": string
    "budget": string
    "category": {
            "id": string
            "name": string
        },
    "cost": number
    "services": [
        {
            "id": string
            "cost": string
        }
    ]
}

export interface ActivitiesDatabaseResponse {
    object: string
    results: Result[]
    next_cursor: any
    has_more: boolean
    type: string
    page_or_database: PageOrDatabase
    request_id: string
}

export interface Result {
    object: string
    id: string
    created_time: string
    last_edited_time: string
    created_by: CreatedBy
    last_edited_by: LastEditedBy
    cover: any
    icon: any
    parent: Parent
    archived: boolean
    properties: Properties
    url: string
    public_url: any
}

export interface CreatedBy {
    object: string
    id: string
}

export interface LastEditedBy {
    object: string
    id: string
}

export interface Parent {
    type: string
    database_id: string
}

export interface Properties {
    Status: Status
    "Earliest Do Date - Rollup": EarliestDoDateRollup
    Priority: Priority
    "Due Dates": DueDates
    Cost: Cost
    "In progress tasks": InProgressTasks
    "Closing Dates": ClosingDates
    "Earliest Do Date": EarliestDoDate
    Notes: Notes
    "Latest Due Date - Rollup": LatestDueDateRollup
    Days: Days
    "Created by": CreatedBy2
    Objectives: Objectives
    "Latest Closing Date": LatestClosingDate
    "Completed tasks": CompletedTasks
    "Deadline status": DeadlineStatus
    "Quantity of tasks": QuantityOfTasks
    "Closing Date": ClosingDate
    "Last edited time": LastEditedTime
    Tasks: Tasks
    "Do Dates": DoDates
    "Latest Due Date": LatestDueDate
    Budget: Budget
    "Last edited by": LastEditedBy2
    "Created time": CreatedTime
    Assign: Assign
    "To-Do tasks": ToDoTasks
    Tags: Tags
    Difficulty: Difficulty
    "Status tasks": StatusTasks
    Name: Name
}

export interface Status {
    id: string
    type: string
    formula: Formula
}

export interface Formula {
    type: string
    string: string
}

export interface EarliestDoDateRollup {
    id: string
    type: string
    formula: Formula2
}

export interface Formula2 {
    type: string
    date: Date
}

export interface Date {
    start: string
    end: any
    time_zone: any
}

export interface Priority {
    id: string
    type: string
    select: Select
}

export interface Select {
    id: string
    name: string
    color: string
}

export interface DueDates {
    id: string
    type: string
    rollup: Rollup
}

export interface Rollup {
    type: string
    array: Array[]
    function: string
}

export interface Array {
    type: string
    date: Date2
}

export interface Date2 {
    start: string
    end: any
    time_zone: any
}

export interface Cost {
    id: string
    type: string
    rollup: Rollup2
}

export interface Rollup2 {
    type: string
    number: number
    function: string
}

export interface InProgressTasks {
    id: string
    type: string
    rollup: Rollup3
}

export interface Rollup3 {
    type: string
    number: number
    function: string
}

export interface ClosingDates {
    id: string
    type: string
    rollup: Rollup4
}

export interface Rollup4 {
    type: string
    array: Array2[]
    function: string
}

export interface Array2 {
    type: string
    formula: Formula3
}

export interface Formula3 {
    type: string
    string?: string
    date?: Date3
}

export interface Date3 {
    start: string
    end: string
    time_zone: any
}

export interface EarliestDoDate {
    id: string
    type: string
    rollup: Rollup5
}

export interface Rollup5 {
    type: string
    date: Date4
    function: string
}

export interface Date4 {
    start: string
    end: any
    time_zone: any
}

export interface Notes {
    id: string
    type: string
    rich_text: RichText[]
}

export interface RichText {
    type: string
    text: Text
    annotations: Annotations
    plain_text: string
    href: any
}

export interface Text {
    content: string
    link: any
}

export interface Annotations {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
}

export interface LatestDueDateRollup {
    id: string
    type: string
    formula: Formula4
}

export interface Formula4 {
    type: string
    date: Date5
}

export interface Date5 {
    start: string
    end: any
    time_zone: any
}

export interface Days {
    id: string
    type: string
    relation: Relation[]
    has_more: boolean
}

export interface Relation {
    id: string
}

export interface CreatedBy2 {
    id: string
    type: string
    created_by: CreatedBy3
}

export interface CreatedBy3 {
    object: string
    id: string
}

export interface Objectives {
    id: string
    type: string
    relation: Relation2[]
    has_more: boolean
}

export interface Relation2 {
    id: string
}

export interface LatestClosingDate {
    id: string
    type: string
    rollup: Rollup6
}

export interface Rollup6 {
    type: string
    date?: Date6
    function: string
}

export interface Date6 {
    start: string
    end: any
    time_zone: any
}

export interface CompletedTasks {
    id: string
    type: string
    rollup: Rollup7
}

export interface Rollup7 {
    type: string
    number: number
    function: string
}

export interface DeadlineStatus {
    id: string
    type: string
    formula: Formula5
}

export interface Formula5 {
    type: string
    string: string
}

export interface QuantityOfTasks {
    id: string
    type: string
    rollup: Rollup8
}

export interface Rollup8 {
    type: string
    number: number
    function: string
}

export interface ClosingDate {
    id: string
    type: string
    formula: Formula6
}

export interface Formula6 {
    type: string
    string: string
}

export interface LastEditedTime {
    id: string
    type: string
    last_edited_time: string
}

export interface Tasks {
    id: string
    type: string
    relation: Relation3[]
    has_more: boolean
}

export interface Relation3 {
    id: string
}

export interface DoDates {
    id: string
    type: string
    rollup: Rollup9
}

export interface Rollup9 {
    type: string
    array: Array3[]
    function: string
}

export interface Array3 {
    type: string
    date: Date7
}

export interface Date7 {
    start: string
    end: any
    time_zone: any
}

export interface LatestDueDate {
    id: string
    type: string
    rollup: Rollup10
}

export interface Rollup10 {
    type: string
    date: Date8
    function: string
}

export interface Date8 {
    start: string
    end: any
    time_zone: any
}

export interface Budget {
    id: string
    type: string
    number?: number
}

export interface LastEditedBy2 {
    id: string
    type: string
    last_edited_by: LastEditedBy3
}

export interface LastEditedBy3 {
    object: string
    id: string
}

export interface CreatedTime {
    id: string
    type: string
    created_time: string
}

export interface Assign {
    id: string
    type: string
    people: People[]
}

export interface People {
    object: string
    id: string
}

export interface ToDoTasks {
    id: string
    type: string
    rollup: Rollup11
}

export interface Rollup11 {
    type: string
    number: number
    function: string
}

export interface Tags {
    id: string
    type: string
    multi_select: MultiSelect[]
}

export interface MultiSelect {
    id: string
    name: string
    color: string
}

export interface Difficulty {
    id: string
    type: string
    select: Select2
}

export interface Select2 {
    id: string
    name: string
    color: string
}

export interface StatusTasks {
    id: string
    type: string
    formula: Formula7
}

export interface Formula7 {
    type: string
    string: string
}

export interface Name {
    id: string
    type: string
    title: Title[]
}

export interface Title {
    type: string
    text: Text2
    annotations: Annotations2
    plain_text: string
    href: any
}

export interface Text2 {
    content: string
    link: any
}

export interface Annotations2 {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
}

export interface PageOrDatabase {}
