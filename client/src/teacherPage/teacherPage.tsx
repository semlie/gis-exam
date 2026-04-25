import { useEffect } from "react"

const TeacherPage = ()=>{
    useEffect(
        () => {
            const loadLocationsOfClass = async () => {
              try {
                const data = await ();
                
              } catch (error) {
                console.error('Failed to load location:', error);
              }
            };
        
            loadClasses();
          }, []
    )
    return <>

    </>
}