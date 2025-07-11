import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class MyProgram extends JFrame {

    private JTextField radiusField;
    private JLabel resultLabel;

    public MyProgram() {
        setTitle("Circle Calculator");
        setSize(400, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new FlowLayout());

        add(new JLabel("Enter Radius:"));
        radiusField = new JTextField(10);
        add(radiusField);

        resultLabel = new JLabel("Click on the panel to calculate.");
        add(resultLabel);

        JPanel mousePanel = new JPanel();
        mousePanel.setPreferredSize(new Dimension(350, 80));
        mousePanel.setBackground(Color.LIGHT_GRAY);
        add(mousePanel);

        mousePanel.addMouseListener(new MouseAdapter() {
            public void mousePressed(MouseEvent e) {
                calculateArea();
            }

            public void mouseReleased(MouseEvent e) {
                calculateCircumference();
            }
        });

        setVisible(true);
    }

    private void calculateArea() {
        try {
            double radius = Double.parseDouble(radiusField.getText());
            double area = Math.PI * radius * radius;
            resultLabel.setText("Area: " + String.format("%.2f", area));
        } catch (NumberFormatException e) {
            resultLabel.setText("Please enter a valid number.");
        }
    }

    private void calculateCircumference() {
        try {
            double radius = Double.parseDouble(radiusField.getText());
            double circumference = 2 * Math.PI * radius;
            resultLabel.setText("Circumference: " + String.format("%.2f", circumference));
        } catch (NumberFormatException e) {
            resultLabel.setText("Please enter a valid number.");
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(MyProgram::new);
    }
}
