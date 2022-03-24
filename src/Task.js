class Task {
    constructor(title, desc, dueDate = 'today') {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setDesc(desc) {
        this.desc = desc;
    }

    getDesc() {
        return this.desc;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    getDueDate() {
        return this.dueDate;
    }



}

export default Task;