import { map, Observable, of } from "rxjs";
import { delay, tap } from "rxjs/operators";

/**
 * This service acts as a mock back-end.
 * It has some intentional errors that you might have to fix.
 */

export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: string;
  assigneeId: null | number;
  completed: boolean;
};

function randomDelay() {
  if (process.env.NODE_ENV === "test") {
    return 0;
  }
  return Math.random() * 4000;
}

export class BackendService {
  private storedTickets: Ticket[] = [
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      completed: false,
    },
    {
      id: 1,
      description: "Move the desk to the new location 1 ",
      assigneeId: 112,
      completed: false,
    },
    {
      id: 2,
      description: "Install a monitor arm 2",
      assigneeId: 113,
      completed: false,
    },
    {
      id: 3,
      description: "Move the desk to the new location 3",
      assigneeId: 111,
      completed: false,
    },
    {
      id: 4,
      description: "Install a monitor arm 4",
      assigneeId: null,
      completed: false,
    },
    {
      id: 5,
      description: "Move the desk to the new location 5",
      assigneeId: null,
      completed: false,
    },
    {
      id: 6,
      description: "Install a monitor arm 6",
      assigneeId: 111,
      completed: true,
    },
    {
      id: 7,
      description: "Move the desk to the new location 7",
      assigneeId: 111,
      completed: true,
    },
  ];

  private storedUsers: User[] = [
    { id: 111, name: "Victor" },
    { id: 112, name: "Jeff" },
    { id: 113, name: "Jack" },
  ];

  private lastId = this.storedTickets.length - 1;

  private findTicketById = (id: number): Ticket | undefined => {
    return this.storedTickets.find((ticket) => ticket.id === +id);
  };

  private findTicketIndexById = (id: number): number => {
    return this.storedTickets.findIndex((ticket) => ticket.id === +id);
  };

  private findUserById = (id: number): User | undefined => {
    return this.storedUsers.find((user) => user.id === +id);
  };

  tickets(): Observable<Ticket[]> {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  ticket(id: number): Observable<Ticket> {
    const ticket = this.findTicketById(id);
    if (!ticket) {
      throw new Error(`Could not find ticket with id ${id}`);
    }
    return of(ticket).pipe(delay(randomDelay()));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number): Observable<User> {
    const user = this.findUserById(id);
    if (!user) {
      throw new Error(`Could not find user with id ${id}`);
    }
    return of(user).pipe(delay(randomDelay()));
  }

  newTicket(payload: Ticket): Observable<Ticket> {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: payload.assigneeId,
      completed: payload.completed,
    };

    return of(newTicket).pipe(
      delay(randomDelay()),
      tap((ticket: Ticket) => this.storedTickets.push(ticket))
    );
  }

  saveTicket(payload: Ticket) {
    const index = this.findTicketIndexById(payload.id);
    if (index === -1) {
      throw new Error(`Could not find ticket with id ${payload.id}`);
    }
    return of(index).pipe(
      delay(randomDelay()),
      map((index: number) => {
        this.storedTickets[index] = {
          ...payload,
        };
        return this.storedTickets[index];
      })
    );
  }

  assign(ticketId: number, userId: number): Observable<Ticket> {
    const index = this.findTicketIndexById(+ticketId);
    const user = this.findUserById(+userId);

    if (index === -1 || !user) {
      throw new Error("ticket or user not found");
    }

    return of(index).pipe(
      delay(randomDelay()),
      map((index: number) => {
        this.storedTickets[index].assigneeId = user.id;
        return this.storedTickets[index];
      })
    );
  }

  toggleStatus(ticketId: number) {
    const index = this.findTicketIndexById(+ticketId);
    if (index === -1) {
      throw new Error("ticket not found");
    }

    return of(index).pipe(
      delay(randomDelay()),
      tap((index: number) => {
        const ticket = this.storedTickets[index];
        ticket.completed = !ticket.completed;
      })
    );
  }
}
