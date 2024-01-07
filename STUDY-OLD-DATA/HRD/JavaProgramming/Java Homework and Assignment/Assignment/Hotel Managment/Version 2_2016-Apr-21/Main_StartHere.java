import java.util.Scanner;

public class Main_StartHere {
	
	public static Hotel h;
	
	//show start menu
	public static void StartMenu(){
		Scanner sc=new Scanner(System.in);
		String choice;
		do{
			System.out.println("-------------------Welcome to Hotel Management System---------------------");
			System.out.println("1. Input Number of floor and room");
			System.out.println("2. Show Menu");
			System.out.println("3.Exit");
			System.out.print("Choose Option(1-3):");
			choice=sc.next();
			switch(choice){
			case "1":	clearScreen();
				setRoomFloor();
				clearScreen();
				break;
			case "2":	clearScreen();
				ManageMenu();
				break;
			case "3":System.out.println("Program Exitted!");
				System.exit(0);
			default:	System.err.println("\n-------Invalid input, please input number-------");
						System.out.println();
				clearScreen();
				break;
			}
		}while(choice!="3");
	}
	//show management menu
		public static void ManageMenu(){
			if(!Hotel.isSetup()){
				System.out.println("The hotel wasn't setup floors and rooms yet.");
/*				System.out.println("----------------------------------***-----------------------------------");*/
				return;
			}
			Scanner sc=new Scanner(System.in);
			int choice=0;
			do{
				System.out.println("1.Check In\t2.Check Out\t3.Display\t4.Exit");
				System.out.print("Choose Option(1-4):");
				try{
					choice=sc.nextInt();
				}catch(Exception ex){
					System.out.println("--------------------Invalid input, please try again.------------------");
					sc.next();
					continue;
				}
				
				switch(choice){
				case 1:	
					checkIn();
					clearScreen();	
					break;
				case 2:		
					checkOut();
					clearScreen();
					break;
				case 3:	
					h.display();
					clearScreen();
					break;
				case 4:	clearScreen();
					break;
				default:	
					break;
				}
			}while(choice!=4);
		}
	
	//setup floor and room
	public static void setRoomFloor(){
		Scanner sc=new Scanner(System.in);
		while(true){
			try{
				System.out.println("Enter Amount of Floors and Rooms:");
				int num;
				num=sc.nextInt();
				//System.out.println("Not Error Here");
				h=Hotel.getInstance();
				h.setFloorAndRoom(num);
				System.out.println("Floors and rooms have been setup!");
				System.out.println("You have "+num+" floors and "+h.getNumberOfRoom()+" rooms...");
				break;
			}catch(Exception ex){
				System.out.println("Error");
				//System.out.println(ex.getMessage());
				sc.next();
				continue;
			}
		}
	}
	
	
	
	//clear Screen
	public static void clearScreen(){
		System.out.println("----------------------------------------------****-----------------------------------------");
		for(int i=0;i<5;i++){
			System.out.println();
		}
	}
	//room and floor validation
	public static boolean isRFvalidated(String args, int i){
		try{
			if(i>=h.getNumber()){
				System.out.println("-------Invalid "+args+"-------");
				return false;
			}
		}catch(Exception ex){
			System.out.println("-------Invalid "+args+"-------");
			return false;
		}
		return true;
	}
	//check in
	public static void checkIn(){
		String string="";
		int room=0,floor=0;
		boolean isValid=true;
		Scanner sc=new Scanner(System.in);
		if(!h.isThereRoomFree())	return;
		do{
			System.out.println();
			do{
				System.out.println("Enter floor(0-"+(h.getNumber()-1)+"):");
				try{
					floor=sc.nextInt();
				}catch(Exception ex){
					System.out.println("-------Invalid input, please input number-------");
					sc.nextLine();
					continue;
				}
				if(!isRFvalidated("floor", floor)){
					isValid=false;
					continue;
				}
				isValid=true;
				break;
			}while(true);
			
			do{
				System.out.println("Enter room(0-"+(h.getNumber()-1)+"):");		
				try{
					room=sc.nextInt();
				}catch(Exception ex){
					System.out.println("-------Invalid input, please input number-------");
					sc.nextLine();
					continue;
				}
				if(!isRFvalidated("room", room)||!h.checkAvailability(room, floor)||h.isRoomCheck(room, floor)){
					isValid=false;
					continue;
				}
				isValid=true;
				break;
			}while(true);
				
			System.out.println("Enter Guest Name:");						sc.nextLine();string=sc.nextLine();
			if(isValid){
				h.checkIn(room, floor, string);
				break;
			}
			
		}while(h.isThereRoomFree());

	}
	
	//check out
	public static void checkOut(){
		if(h.isAllRoomFree())
			return;
		String string;
		int room,floor;
		boolean isValid=true;
		Scanner sc=new Scanner(System.in);
		
		do{
			System.out.println("Enter floor(0-"+(h.getNumber()-1)+"):");
			try{
				floor=sc.nextInt();
			}catch(Exception ex){
				System.out.println("-------Invalid input, please input number-------");
				sc.nextLine();
				continue;
			}
			if(!isRFvalidated("floor", floor)){
				isValid=false;
				continue;
			}
			isValid=true;
			break;
		}while(true);
		
		do{
			System.out.println("Enter room(0-"+(h.getNumber()-1)+"):");		
			try{
				room=sc.nextInt();
			}catch(Exception ex){
				System.out.println("-------Invalid input, please input number-------");
				sc.nextLine();
				continue;
			}
			if(!isRFvalidated("room", room)||!h.checkAvailability(room, floor)){
				isValid=false;
				continue;
			}
			isValid=true;
			break;
		}while(true);

		h.checkOut(room, floor);
	}
	
	public static void main(String[] args){
		
		Main_StartHere.StartMenu();
	}
}
