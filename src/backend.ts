import { Observable, of } from "rxjs";
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
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: false,
    },
  ];

  private storedUsers: User[] = [{ id: 111, name: "Victor" }];

  private lastId = 1;

  private findTicketById = (id: number): Ticket | undefined => {
    return this.storedTickets.find((ticket) => ticket.id === +id);
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

  newTicket(payload: { description: string }): Observable<Ticket> {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: null,
      completed: false,
    };

    return of(newTicket).pipe(
      delay(randomDelay()),
      tap((ticket: Ticket) => this.storedTickets.push(ticket))
    );
  }

  assign(ticketId: number, userId: number): Observable<Ticket> {
    const foundTicket = this.findTicketById(+ticketId);
    const user = this.findUserById(+userId);

    if (!(foundTicket && user)) {
      throw new Error("ticket or user not found");
    }

    return of(foundTicket).pipe(
      delay(randomDelay()),
      tap((ticket: Ticket) => {
        ticket.assigneeId = +userId;
      })
    );
  }

  toggleStatus(ticketId: number) {
    const foundTicket = this.findTicketById(+ticketId);
    if (!foundTicket) {
      throw new Error("ticket not found");
    }

    return of(foundTicket).pipe(
      delay(randomDelay()),
      tap((ticket: Ticket) => {
        ticket.completed = !ticket.completed;
      })
    );
  }
}
