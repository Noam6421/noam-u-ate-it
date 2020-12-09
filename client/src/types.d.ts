interface Food {
    name: string
    value: string
}

interface User { 
    name: string
    lastName: string
    birthDate: Date
    beer?: string
    idNum: string
    phone: string
}

type UserState = {
    user: User
}

type UserAction = {
    type: string
    user: User
}

type DispatchType = (args: FoodAction) => FoodAction