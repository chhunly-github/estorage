package Homework_01;

public class Shape_Generator {
	
	public static void shapei_star(int number){
		for(int i=0;i<number;i++){
			for(int j=0;j<i;j++)
				System.out.print(" ");
			for(int j=0;j<(number-i)*2-1;j++)
				System.out.print("*");
			System.out.println();
		}
	}
	public static void shapeii_star(int number){
		for(int i=0;i<number;i++){
			for(int j=i;j<number;j++)
				System.out.print(" ");
			for(int j=0;j<i*2-1;j++)
				System.out.print("*");
			System.out.println();
		}
	}
	public static void shapeiii_ABC(int number){
		for(int i='A'+number;i>='A';i--){
			for(int j='A';j<i;j++)
				System.out.print((char)j);
			System.out.println();
		}
	}
	public static void shapeiv_ABC(int number){
		for(int i='A';i<='A'+number;i++){
			for(int j='A';j<i;j++)
				System.out.print((char)j);
			System.out.println();
		}
	}
	private Shape_Generator(){
		
	}
	public static void main(String[] args){
		System.out.println("i");
		Shape_Generator.shapei_star(9);
		System.out.println("ii");
		Shape_Generator.shapeii_star(9);
		System.out.println("iii");
		Shape_Generator.shapeiii_ABC(9);
		System.out.println("iv");
		Shape_Generator.shapeiv_ABC(9);
	}
	
}
