import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import _ from 'lodash';

export interface IStateUpdate<TState> {
    (oldState: TState): TState
}

export class Service<TState> {
    public state: BehaviorSubject<TState>;
    protected stateChanges: Subject<IStateUpdate<TState>> = new Subject<IStateUpdate<TState>>();

    constructor(private initialState: TState, environment: any) {
        this.state = new BehaviorSubject<TState>(initialState);

        this.stateChanges.pipe(
            scan((
                oldState: TState,
                updateOperation: IStateUpdate<TState>
            ) => {
                const updatedState = updateOperation(oldState);

                const changeMade = !_.isEqual(oldState, updatedState);
                if (changeMade && environment.logStateChange) {
                    console.log('State update', { old: oldState, new: updatedState });
                }

                return updatedState;
            }, initialState)
        ).subscribe(this.state);
    }

    pick = <T>(callback: (state: TState) => T): Observable<T> => this.state.pipe(map(s => callback(s)));
    setState = (update: IStateUpdate<TState>) => this.stateChanges.next(update);
    reset = () => this.setState(() => this.initialState);
}