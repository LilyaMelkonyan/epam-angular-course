import { Observable } from 'rxjs';

function uniqueData<T>(source: Observable<T>) {
    console.log('****', source);
    
    return new Observable(subscriber => {
        const subscription = source.subscribe({
            next(value:any) {
                if(value !== undefined && value !== null) {
                    const uniqueValues = new Set(value);
                    subscriber.next(Array.from(uniqueValues));
                }
            },
            error(error) {
              subscriber.error(error);
            },
            complete() {
              subscriber.complete();
            }
          })

          return () => subscription.unsubscribe();
      });
}

export {
    uniqueData
}